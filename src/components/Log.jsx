export default function Log({ turns }) {
  return (
    <div className="log-wrapper">
      <ol id="log">
        {turns.map((turn) => (
          <li key={`${turn.square.row}${turn.square.col}`}>
            {turn.player} Selected {turn.square.row} , {turn.square.col}
          </li>
        ))}
      </ol>
    </div>
  );
}
