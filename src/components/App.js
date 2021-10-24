import React, { Component } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import s from "./Searchbar/Searchbar.module.css";
import Searchbar from "./Searchbar/Searchbar";
import ImageGallery from "./ImageGallery/ImageGallery";
import Modal from "./Modal/Modal";
import Button from "./Button/Button";
import imageAPI from "../services/image-api";
import Spinner from "./Spinner/Spinner";

class App extends Component {
  state = {
    page: 1,
    data: [],
    query: null,
    error: null,
    showModal: false,
    largeImg: "",
    status: "idle",
  };

  componentDidUpdate(prevProps, prevState) {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });

    const prevQuery = prevState.query;
    const nextQuery = this.state.query;
    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevPage !== nextPage || prevQuery !== nextQuery) {
      this.setState({ status: "pending" });
      imageAPI
        .fetchImage(nextQuery, nextPage)
        .then(({ hits }) => {
          this.setState((prevState) => ({
            data: [
              ...prevState.data,
              ...hits.map(({ id, webformatURL, largeImageURL }) => ({
                id,
                webformatURL,
                largeImageURL,
              })),
            ],
          }));
        })
        .catch((error) => this.setState({ error, status: "rejected" }))
        .finally(() => this.setState({ status: "resolved" }));
    }
  }

  handleSubmit = (query) => {
    this.resetPage();
    this.setState({ query });
  };

  resetPage = () => {
    this.setState({
      page: 1,
      data: [],
      showModal: false,
      status: "idle",
    });
  };

  handleLoadMore = () => {
    this.setState(({ page }) => ({
      page: page + 1,
    }));
  };

  handleLargeImage = (event) => {
    this.setState({ showModal: true, largeImg: event.currentTarget.alt });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  render() {
    const { data, status, showModal, query } = this.state;

    return (
      <div className="App">
        <Searchbar onSubmit={this.handleSubmit} />

        {status === "idle" && (
          <h1 className={s.SearchbarTitle}>Введите запрос</h1>
        )}

        {data.length > 0 && (
          <ImageGallery data={data} handleLargeImage={this.handleLargeImage} />
        )}

        {data.length >= 12 && status === "resolved" && (
          <Button handleLoadMore={this.handleLoadMore} />
        )}

        {data.length === 0 && status === "resolved" && (
          <h2 className={s.SearchbarTitle}>
            По запросу "{query}" ничего не найдено
          </h2>
        )}

        {showModal && (
          <Modal largeImg={this.state.largeImg} onClose={this.toggleModal} />
        )}

        {status === "pending" && <Spinner />}

        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}

export default App;
