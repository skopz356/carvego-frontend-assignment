import {Helmet} from 'react-helmet-async';
import {useTranslation} from 'react-i18next';
import {TodosPage} from './pages/TodosPage/TodosPage';

function App() {
  const {i18n, t} = useTranslation();

  return (
    <>
      <Helmet
        titleTemplate={`%s - ${t('app.title')}`}
        defaultTitle={t('app.title')}
        htmlAttributes={{lang: i18n.language}}
      >
        <meta name="description" content={t('app.description')} />
      </Helmet>

      {/**
       * start from here
       */}
      <TodosPage />
    </>
  );
}

export default App;
