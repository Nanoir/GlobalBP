import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const ChessDatabase = () => {
  const [player, setPlayer] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handlePlayerChange = (e) => {
    setPlayer(e.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    // 检查玩家名是否非空
    if (!player) {
      toast.error('请填写玩家名');
      return;
    }

    try {
      const response = await axios.get(`http://127.0.0.1:8000/games`, {
        params: {
          player: player,
        },
      });
      const games = response.data.games;
      if (Array.isArray(games)) {
        setSearchResults(games);
        setCurrentPage(1); // Reset to the first page when a new search is performed
      } else {
        console.error('从服务器获取的数据不是一个数组:', games);
        setSearchResults([]);
        toast.error('获取数据失败');
      }

      console.log(response.data);
    } catch (error) {
      console.error('获取数据时发生错误:', error);
      setSearchResults([]);
      toast.error('获取数据失败');
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = searchResults.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: 'auto', padding: '20px' }}>
      <form onSubmit={handleSearch} style={{ marginBottom: '20px' }}>
        <label style={{ marginRight: '10px' }}>
          玩家名:
          <input type="text" value={player} onChange={handlePlayerChange} style={{ marginLeft: '5px' }} />
        </label>
        <button
          type="submit"
          style={{
            padding: '5px 10px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '3px',
          }}
        >
          搜索
        </button>
      </form>
      <hr />
      <h2 style={{ color: '#333' }}>搜索结果：</h2>
      <ul style={{ listStyleType: 'none', padding: '0' }}>
        {currentItems.map((game) => (
          <li
            key={game.ID}
            style={{ marginBottom: '10px', borderBottom: '1px solid #ddd', paddingBottom: '5px' }}
          >
            <strong>ID:</strong> {game.ID}, <strong>White:</strong> {game.White}, <strong>Black:</strong> {game.Black}, <strong>Result:</strong> {game.Result}, <strong>Date:</strong> {game.Date}
          </li>
        ))}
      </ul>
      {/* Pagination */}
      <div style={{ textAlign: 'center' }}>
        {Array.from({ length: Math.ceil(searchResults.length / itemsPerPage) }, (_, index) => (
          <button key={index + 1} onClick={() => paginate(index + 1)} style={{ margin: '5px' }}>
            {index + 1}
          </button>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
};

export default ChessDatabase;
