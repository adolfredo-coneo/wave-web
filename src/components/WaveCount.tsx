import React, { useEffect, useState } from 'react';

import { totalWaves } from '../ethereum/waveContractHandler';

interface Props {
  waveCount: number;
}

const WaveCount: React.FC<Props> = ({ waveCount }) => {
  const [count, setCount] = useState(waveCount);

  useEffect(() => {
    const getWaves = async () => {
      const total = await totalWaves();
      if (total.status) setCount(parseInt(total.result));
    };
    getWaves();
  }, []);

  useEffect(() => {
    setCount(waveCount);
  }, [waveCount]);

  return <div>{count} are rocking with me!!! Yeah!!!</div>;
};

export default WaveCount;
