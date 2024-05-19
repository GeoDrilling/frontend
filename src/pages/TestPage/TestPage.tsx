import { FC } from 'react';
import { Curve, CurveTrack, LogView } from 'geochart';

const TestPage: FC = () => {
  return (
    <div>
      <LogView
        depth={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
        grid={{
          main: {
            interval: 2,
          },
        }}
        scope={10}
      >
        <CurveTrack>
          <Curve name={'Curve1'} domain={{ max: 10, min: 1 }} data={[1, 2, 3, 5, 7]} />
          <Curve name={'Curve2'} domain={{ max: 10, min: 1 }} data={[1, 3, 5, 7, 8, 7, 5, 4, 3, 2]} />
        </CurveTrack>
      </LogView>
    </div>
  );
};

export default TestPage;
