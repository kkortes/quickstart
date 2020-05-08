import Icon from './Icon';

export default ({ id, text, onChange, value }) => {
  return (
    <div className='checkbox'>
      <label htmlFor={id}>
        <input
          type='checkbox'
          id={id}
          onChange={({ target: { checked } }) => onChange(checked)}
          checked={value}
        />
        <div className='box'>
          <Icon name='success' color='lightgreen' size={16} />
        </div>
        {text}
      </label>

      <style jsx>
        {`
          .checkbox {
            display: flex;
            flex-direction: row;
          }
          input {
            display: none;
          }
          input:checked + .box :global(.icon) {
            display: flex;
          }
          label {
            display: flex;
            flex-direction: row;
            margin-right: 4px;
          }
          .box {
            width: 18px;
            height: 18px;
            border: 1px solid #eee;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-right: 8px;
          }
          .box :global(.icon) {
            display: none;
          }
        `}
      </style>
    </div>
  );
};
