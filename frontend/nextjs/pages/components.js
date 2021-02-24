import Button from '../components/ui/Button';
import Icon from '../components/ui/Icon';
import TextInput from '../components/ui/TextInput';
import Crow from '../components/ui/Crow';
import InlineComponent from '../components/ui/Button';
import Icons from '../public/static/icomoon/selection.json';

const Component = () => (
  <>
    <div style={{ height: 150 }} />
    <Crow horizontal wingSpan='auto'>
      <Crow vertical left gutter={12}>
        <TextInput text='Data type' onChange={console.info} />
        <Button text='Normal' onClick={() => console.info('clicked')} />
        <Button
          small='true'
          text='Normal'
          onClick={() => console.info('clicked')}
        />
        <Button
          primary
          text='Primary'
          onClick={() => console.info('clicked')}
        />
        <Crow horizontal gutter={4}>
          {Icons.icons.map((icon) => (
            <div key={icon.properties.name} style={{ position: 'relative' }}>
              <Icon name={icon.properties.name} />
            </div>
          ))}
        </Crow>
        <Crow vertical gutter={10}>
          <Crow gutter={20} wingSpan={[10, 90]}>
            <span>1.</span>
            <span>Row one</span>
          </Crow>
          <Crow gutter={20} wingSpan={[10, 90]}>
            {['2.', 'Row two']}
          </Crow>
          <Crow gutter={20} wingSpan={[10, 90]}>
            3.
            <Button text='Row three' />
          </Crow>
          <Crow gutter={20} wingSpan={[10, 90]}>
            4.
            <Icon name='logo' />
          </Crow>

          <Crow wingSpan='auto'>
            <InlineComponent text='Text 1' />
            <InlineComponent text='Text 2' />
          </Crow>

          <Crow wingSpan='auto'>
            <InlineComponent text='Text 3' />
          </Crow>

          <Crow wingSpan='auto'>
            <InlineComponent text='Text 4' />
            <InlineComponent text='Text 5' />
            <InlineComponent text='Text 6' />
          </Crow>

          <Crow wingSpan='auto'>
            <InlineComponent text='Text 7' />
            <InlineComponent text='Text 8' />
            <InlineComponent text='Text 9' />
            <InlineComponent text='Text 10' />
          </Crow>
        </Crow>
      </Crow>
    </Crow>
  </>
);

export default Component;
