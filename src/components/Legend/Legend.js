import React from 'react';
import './Legend.css';
import LegendRow from './LegendRow';
import LegendTitle from './LegendTitle';
import {COLORS} from '../../utils/helpers'

const Legend = React.memo(() =>
    <div className='legend paper'>
        <LegendTitle/>
        <LegendRow color={COLORS.red} label={'0 - 20'}/>
        <LegendRow color={COLORS.orange} label={'20 - 30'}/>
        <LegendRow color={COLORS.yellow} label={'30 - 40'}/>
        <LegendRow color={COLORS.green} label={'40 - 50'}/>
        <LegendRow color={COLORS.blue} label={'50 - 80'}/>
        <LegendRow color={COLORS.lime} label={'80 - 100'}/>
        <LegendRow color={COLORS.purple} label={`Construccion ${new Date().getFullYear()}`}/>
        <LegendRow color={COLORS.black} label={'Error'}/>
    </div>);

export default Legend;
