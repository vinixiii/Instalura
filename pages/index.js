import Menu from '../src/components/common/Menu';
import Footer from '../src/components/common/Footer';

export default function Home() {
  return (
    <div
      style={{
        flex: '1',
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <Menu />
      <Footer />
    </div>
  );
}
