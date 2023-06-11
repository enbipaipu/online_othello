import type { UserId } from '$/commonTypesWithClient/branded';
import { userColorRepository } from './userColorrepository';
export type BoardArr = number[][];
export type Pos = { x: number; y: number };



const board: BoardArr = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 2, 0, 0, 0],
  [0, 0, 0, 2, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
];


const direction = [
  [-1, 0],
  [-1, 1],
  [0, 1],
  [1, 1],
  [1, 0],
  [1, -1],
  [0, -1],
  [-1, -1],
];

const changBoard = (y:number,x:number,s:number[],distance:number,turnColor:number)=>{
  for (let i = distance; i >= 0;i-=1){
    board[y + s[0] * i][x + s[1] * i] = turnColor;
  }
}


const boardTerms = (y:number,x:number,s:number[],ok:boolean,distance:number,turnColor:number) =>{
  
 if (board[y+s[0]*distance]===undefined || board[y+s[0]*distance][x+s[1]*distance]%3===0){
  ok=false
 }else if (board[y+s[0]*distance][x+s[1]*distance]===3-turnColor){
//
 }else if (board[y+s[0]*distance][x+s[1]*distance]===turnColor){
changBoard(y,x,s,distance,turnColor);
}}

const boardFor = function(y:number,x:number,s:number[],ok:boolean,turnColor:number){
  for (let distance = 1; distance < 8; distance += 1){
boardTerms(y,x,s,ok,distance,turnColor)
}
}

const makeBoard = (y: number, x: number,turnColor:number) => {
  if (board[y][x]===0){
    for (const s of direction){
      const ok = true
      boardFor(y,x,s,ok,turnColor)
    }
    return board
    
  }
};

export const boardRepository = {
  getBoard: (): BoardArr => board,
  clickBoard: (params: Pos, userId: UserId): BoardArr => {
    board[params.y][params.x] = userColorRepository.getUserColor(userId);
    makeBoard(params.y, params.x,userColorRepository.getUserColor(userId));
    return board;

},
};
