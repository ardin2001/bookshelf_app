import React from 'react';
import { Route, Routes } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import { getUserLogged, putAccessToken } from './utils/network';
import ThemeContext from './context/ThemeContext';
import LocaleContext from './context/LocaleContext';
import HomePageWrapper from './pages/HomePage';
import DetailNotePage from './pages/DetailNotePage'
import Header from './component/Header';
import AddPage from './pages/AddNotePage';
import ArchivedPageWrapper from './pages/ArchivedPage';
import Page404 from './pages/404';
import Footer from './component/Footer'
class ContactApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authedUser: null,
      initializing: true,
      localeContext: {
        locale: localStorage.getItem('locale') || 'en',
        toggleLocale: () => {
          this.setState((prevState) => {
            const newLocale = prevState.localeContext.locale === 'id' ? 'en' : 'id';
            localStorage.setItem('locale', newLocale);
            return {
              localeContext: {
                ...prevState.localeContext,
                locale: newLocale
              }
            }
          });
        }
      },
      theme: localStorage.getItem('theme') || 'light',
      toggleTheme: () => {
        this.setState((prevState) => {
          // mendapatkan nilai tema baru berdasarkan state sebelumnya
          const newTheme = prevState.theme === 'light' ? 'dark' : 'light';
          // menyimpan nilai tema baru ke local storage
          localStorage.setItem('theme', newTheme);
 
          // mengembalikan dengan nilai theme terbaru.
          return {
            theme: newTheme
          };
        });
      },
    };
 
    this.onLoginSuccess = this.onLoginSuccess.bind(this);
    this.onLogout = this.onLogout.bind(this);
  }
 
  async onLoginSuccess({ accessToken }) {
    putAccessToken(accessToken);
    const { data } = await getUserLogged();
 
    this.setState(() => {
      return {
        authedUser: data,
      };
    });
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.theme !== this.state.theme) {
      document.documentElement.setAttribute('data-theme', this.state.theme);
    }
  }
  async componentDidMount() {
    document.documentElement.setAttribute('data-theme', this.state.theme);
    const { data } = await getUserLogged();
    this.setState(() => {
      return {
        authedUser: data,
        initializing: false
      };
    });
  }
  onLogout() {
    this.setState(() => {
      return {
        authedUser: null
      }
    });
    putAccessToken('');
  }
  render() {
    if (this.state.initializing) {
      return null;
    }
    
    if (this.state.authedUser === null) {
      return (
        <ThemeContext.Provider value={this.state}>
          <LocaleContext.Provider value={this.state.localeContext}>
            <header className='contact-app__header'>
              <Header/>
            </header>
            <main>
              <Routes>
                <Route path="/*" element={<LoginPage loginSuccess={this.onLoginSuccess} />} />
                <Route path="/register" element={<RegisterPage />} />
              </Routes>
            </main>
            <Footer actor='Ardin Nugraha' message='Thank you for visit my Website'></Footer>
          </LocaleContext.Provider>
        </ThemeContext.Provider>      
      )
    }
 
    return (      
      <ThemeContext.Provider value={this.state}>
        <LocaleContext.Provider value={this.state.localeContext}>
              <header>
                <Header logout={this.onLogout} name={this.state.authedUser.name} />
              </header>
              <main>
                <Routes>
                  <Route path="/" element={<HomePageWrapper />} />
                  <Route path="/add" element={<AddPage />} />
                  <Route path="/note/:id" element={<DetailNotePage />} />
                  <Route path='/archived' element={<ArchivedPageWrapper />} />
                  <Route path="/*" element={<Page404 />} />
                </Routes>
              </main>
              <Footer actor='Ardin Nugraha' message='Thank you for visit my Website'></Footer>
        </LocaleContext.Provider>
      </ThemeContext.Provider>            
    );
  }
}
 
export default ContactApp;