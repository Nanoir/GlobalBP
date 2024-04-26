import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

const Gambling = ({userID}) => {
  const [currentMatches, setCurrentMatches] = useState([]);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [championshipName, setChampionshipName] = useState("");
  const [odds, setOdds] = useState({});
  const [betAmount, setBetAmount] = useState(0);


  useEffect(() => {
    // 示例 API 请求
    fetch('http://127.0.0.1:8000/contests')
      .then(response => response.json())
      .then(data => {
        const name = "World_2024_Chess_Championship";
        setChampionshipName(name);
        setCurrentMatches(data[name]);

        // 计算赔率并存储在状态中
        const oddsData = {};
        Object.keys(data[name]).forEach(roundID => {
          data[name][roundID].forEach(match => {
            if (match.status === "Not Started") {
              oddsData[match.match_id] = calculateOdds();
            }
          });
        });
        setOdds(oddsData);
      })
      .catch(error => {
        console.error('Error fetching current matches:', error);
      });
  }, []);

  const calculateOdds = () => {
    return (2.01);
  };

  const handleBet = (selectedOption, match) => {
    if (betAmount <= 0) {
      // Show toast for invalid bet amount
      toast.error('金额非法，请重新输入');
    } else {
      // Place the bet and send request to the backend
      console.log(`${userID} placed a bet on  ${selectedOption} for Match ID ${match.match_id} with amount ${betAmount}`);
      // Send request to the backend using Axios
      axios.post('http://127.0.0.1:8000/newBet', {
        bet: selectedOption,
        matchID: match.match_id,
        money: betAmount,
        uid: userID
        }, 
        {
        headers: {'Content-Type': 'application/json'}
})
        .then(response => {
          // Show toast for successful bet
          toast.success('下注成功!');
          // Clear bet amount and selected match
          setBetAmount(0);
          setSelectedMatch(null);
          // Update odds after placing the bet
          setOdds({
            ...odds,
            [match.match_id]: calculateOdds(), // Update odds after placing the bet
          });
        })
        .catch(error => {
          console.error('Error placing bet:', error);
          // Show toast for bet placement failure
          toast.error('服务器错误，请稍后重试');
        });
    }
  };
  
  const openBetModal = (match) => {
    setSelectedMatch(match);
  };

  return (
    <div className="w-full p-4 blue-glassmorphism">
      <h1 className="text-2xl font-bold mb-4 text-gradient">SHU Chess Championship🔥🔥🔥</h1>
      <table className="w-full border-collapse border border-gray-300 white-glassmorphism">
        <thead>
          <tr>
            <th className="border border-gray-300 w-1/6 gradient-bg-welcome">Round</th>
            <th className="border border-gray-300 w-1/6 gradient-bg-welcome">Match_ID</th>
            <th className="border border-gray-300 w-1/6 gradient-bg-txs">White</th>
            <th className="border border-gray-300 w-1/6 gradient-bg-services">Black</th>
            <th className="border border-gray-300 w-1/6 gradient-bg-footer">Score</th>
            <th className="border border-gray-300 w-1/6 gradient-bg-welcome">Status</th>
            <th className="border border-gray-300 w-1/6 gradient-bg-services">Odds</th>
            <th className="border border-gray-300 w-1/6 gradient-bg-services">Bet</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(currentMatches).map(roundID => (
            currentMatches[roundID].map(match => (
              <tr key={match.match_id} className="transition-all duration-300 ease-in-out hover:bg-gray-100 transform hover:scale-102">
                <td className="border border-gray-300 p-2">{roundID}</td>
                <td className="border border-gray-300 p-2">{match.match_id}</td>
                <td className="border border-gray-300 p-2">{match.white}</td>
                <td className="border border-gray-300 p-2">{match.black}</td>
                <td className="border border-gray-300 p-2">{match.status === "Finished" || "Ongoing" ? match.score : 'Not Started'}</td>
                <td className="border border-gray-300 p-2">{match.status}</td>
                <td className="border border-gray-300 p-2">
                  {match.status === "Not Started" ? (
                    <span className="text-green-500 font-semibold">{odds[match.match_id]}</span>
                  ) : null}
                </td>
                <td className="border border-gray-300 p-2">
                  {match.status === "Not Started" ? (
                    <button
                      className="bg-blue-500 text-white p-2 rounded-md cursor-pointer"
                      onClick={() => openBetModal(match)}
                    >
                      Bet
                    </button>
                  ) : null}
                </td>
              </tr>
            ))
          ))}
        </tbody>
      </table>
      <div>
        <h3>我的下注</h3>
        {/* 在这里添加显示用户下注的内容 */}
      </div>

      {selectedMatch && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-4 rounded-md">
            <h2 className="text-2xl font-bold mb-2">下注详情</h2>
            <p>{`比赛：White${selectedMatch.white} vs Black${selectedMatch.black}`}</p>
            <p>{`赔率：${odds[selectedMatch.match_id]}`}</p>
            <input
              type="number"
              value={betAmount}
              onChange={(e) => setBetAmount(e.target.value)}
              placeholder="下注金额"
              className="w-full p-2 mt-2 mb-4 border border-gray-300 rounded-md"
            />
            <button
              onClick={() => handleBet("White", selectedMatch, selectedMatch.white)}
              className="bg-white text-black p-2 rounded-md border border-black"
            >
              下注White
            </button>
            <button
              onClick={() => handleBet("Black", selectedMatch, selectedMatch.black)}
              className="bg-black text-white p-2 rounded-md mr-2"
            >
              下注Black
            </button>

            <button
              onClick={() => setSelectedMatch(null)}
              className="text-blue-500 ml-2 underline cursor-pointer"
            >
              取消
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gambling;
