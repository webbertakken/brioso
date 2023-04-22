import React from 'react'
import Panel from "../Panel.tsx";

interface Props {
}

const PartsPanel = ({}: Props): JSX.Element => {
  return <Panel title="Parts">
    <ul>
      <li>Part 1</li>
      <li>Part 2</li>
      <li>Part 3</li>
    </ul>
  </Panel>;
}

export default PartsPanel;
