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
      console.log("Total Waves", total);
      if (total.status) setCount(parseInt(total.result));
    };
    getWaves();
  }, [waveCount]);

  /*useEffect(() => {
    setCount(waveCount);
  }, [waveCount]);*/

  return <div>{count} are rocking with me!!! Yeah!!!</div>;
};

export default WaveCount;
