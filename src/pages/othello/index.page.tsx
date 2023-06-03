import type { TaskModel } from '$/commonTypesWithClient/models';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { Loading } from 'src/components/Loading/Loading';
import { BasicHeader } from 'src/pages/@components/BasicHeader/BasicHeader';
import { apiClient } from 'src/utils/apiClient';
import { returnNull } from 'src/utils/returnNull';
import { userAtom } from '../../atoms/user';
import styles from './othello.module.css';

const Home = () => {
  const clickCell = async (x: number, y: number) => {
    await apiClient.board.$post({ body: { x, y } });
    await fetchBoard();
  };

  const [user] = useAtom(userAtom);
  const [tasks, setTasks] = useState<TaskModel[] | undefined>(undefined);
  const [label, setLabel] = useState('');

  const [board, setBoard] = useState<number[][]>();

  const fetchBoard = async () => {
    const board = await apiClient.board.$get().catch(returnNull);

    if (board !== null) setBoard(board.board);
  };

  useEffect(() => {
    const cancelID = setInterval(fetchBoard, 500);
    return () => {
      clearInterval(cancelID);
    };
  }, []);

  if (!user || !board) return <Loading visible />;

  return (
    <>
      <BasicHeader user={user} />(
      <div className={styles.container}>
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
        {/* <div className={styles['side-panel']}>
          <div className={styles.turn}>
            <h1>{turnColor === 1 ? '黒' : '白'}の番です</h1>
          </div>
          <div className={styles.score}>
            <h1>＜得点＞</h1>
            <h1>黒: {blackStones}</h1>
            <h1>白: {whiteStones}</h1>
          </div>
          
          <button className={styles.button} onClick={resetBoard}>
            リセット
          </button>
                </div> */}
      </div>
      );
    </>
  );
};

export default Home;
