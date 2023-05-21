// import React, { useState, useEffect } from 'react';
//
// function App() {
//     const [data, setData] = useState([]);
//
//     useEffect(() => {
//         const fetchData = async () => {
//             const response = await fetch('https://api.example.com/data', {
//                 headers: {
//                     'Authorization': `Bearer ${YOUR_TOKEN_HERE}`
//                 }
//             });
//             const jsonData = await response.json();
//             setData(jsonData);
//         };
//         fetchData();
//     }, []);
//
//     return (
//         <div>
//             <ul>
//                 {data.map(item => (