import { registerRootComponent } from 'expo';
import { ThemeProvider } from '@/presentation/context';
import { Home } from '@/presentation/pages/home';
import mobileAds from 'react-native-google-mobile-ads';

export default function App() {
  mobileAds()
    .initialize()
    .then((adapterStatuses) => {
      // Initialization complete!
    });

  return (
    <ThemeProvider>
      <Home />
    </ThemeProvider>
  );
}
registerRootComponent(App);
