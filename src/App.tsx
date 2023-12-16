import { FC, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import './App.css';

const Card: FC = (): JSX.Element => {
  const [{ isDragging }, dragRef] = useDrag({
    type: 'card',
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  return (
    <div
      className="card"
      style={{ backgroundColor: isDragging ? 'green' : 'red' }}
      ref={dragRef}
    >
      Кубик в коробке
    </div>
  );
};

const Box: FC<any> = ({ card, moveCard }): JSX.Element => {
  const [{ isOver }, dropRef] = useDrop({
    accept: 'card',
    drop: () => moveCard(),
    collect: (monitor) => ({
      isOver: !monitor.isOver(),
    }),
  });
  return (
    <div
      className="box"
      style={{ backgroundColor: isOver ? 'green' : 'red' }}
      ref={dropRef}
    >
      {card ? <Card /> : 'Коробка'}
    </div>
  );
};

const App: FC = (): JSX.Element => {
  const [index, setIndex] = useState(1);

  function moveCard(i: any) {
    setIndex(i);
  }
  return (
    <div className="App">
      <Box card={index === 1} moveCard={moveCard.bind(null, 1)} />
      <Box card={index === 2} moveCard={moveCard.bind(null, 2)} />
      <Box card={index === 3} moveCard={moveCard.bind(null, 3)} />
    </div>
  );
};

export default App;
