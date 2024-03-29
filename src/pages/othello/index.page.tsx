// import type { TaskModel } from '$/commonTypesWithClient/models';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { boardUsecase } from 'server/usecase/boardUsecase.ts';
import { Loading } from 'src/components/Loading/Loading';
import { apiClient } from 'src/utils/apiClient';
import { returnNull } from 'src/utils/returnNull';
import { userAtom } from '../../atoms/user';
import styles from './othello.module.css';

const Home = () => {
  const [user] = useAtom(userAtom);
  const [board, setBoard] = useState<number[][]>();

<<<<<<< HEAD
  const fetchBoard = async () => {
    const board = await apiClient.rooms.$get().catch(returnNull);

=======
  // const [tasks, setTasks] = useState<TaskModel[] | undefined>(undefined);
  // const [label, setLabel] = useState('');

  const fetchBoard = async () => {
    const board = await apiClient.rooms.$get().catch(returnNull);

>>>>>>> origin/main
    if (board === null) {
      const newRoom = await apiClient.rooms.$post();
      setBoard(newRoom.board);
    } else {
      setBoard(board.board);
    }
  };

  const clickCell = async (x: number, y: number) => {
    await apiClient.rooms.board.$post({ body: { x, y } });
<<<<<<< HEAD
=======
    await fetchBoard();
>>>>>>> origin/main
  };

  useEffect(() => {
    const cancelID = setInterval(fetchBoard, 500);
    return () => {
      clearInterval(cancelID);
    };
  }, []);

  if (!user || !board) return <Loading visible />;

  const reset = async () => {
    //await
  };

<<<<<<< HEAD
  const turnColor = boardUsecase.getTurn();
=======
  const turnColor = boardUsecase.getTurn;
>>>>>>> origin/main

  return (
    <>
      <div className={styles.container}>
        {/* <button className={styles.button} onClick={() => reset()}>
          リセット
        </button> */}
        <div className={styles.board}>
          {board.map((row, y) =>
            row.map((color, x) => (
              <div
                className={styles.cell + (color === 3 ? ` ${styles['orange-border']}` : '')}
                onClick={() => clickCell(x, y)}
                key={`${x}-${y}`}
              >
                {color !== 0 && color !== 3 && (
                  <div
                    className={styles.stone}
                    style={{ background: color === 1 ? '#000' : '#fff' }}
                  />
                )}
              </div>
            ))
          )}
        </div>
        <div className={styles['side-panel']}>
          <div className={styles.turn}>
<<<<<<< HEAD
            <h1>{turnColor === 1 ? '黒' : '白'}の番です</h1>
            <h1>{turnColor === userColorUsecase.getUserColor(userId) ? 'あなたの番です' : null}</h1>
=======
            {/* <h1>{turnColor === 1 ? '黒' : '白'}の番です</h1>
            <h1>{turnColor === userColorUsecase.getUserColor(userId) ? 'あなたの番です' : null}</h1> */}
>>>>>>> origin/main
          </div>
          {/* <div className={styles.score}>
            <h1>＜得点＞</h1>
            <h1>黒: {blackStones}</h1>
            <h1>白: {whiteStones}</h1>
          </div>

<<<<<<< HEAD
          <button className={styles.button} onClick={reset}>
            リセット
          </button>
=======
          <button className={styles.button} onClick={resetBoard}>
            リセット
          </button> */}
>>>>>>> origin/main
        </div>
      </div>
    </>
  );
};

export default Home;
