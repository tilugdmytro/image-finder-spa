import React, { Component } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import Searchbar from "./Searchbar/Searchbar";
import ImageGallery from "./ImageGallery/ImageGallery";
import Button from "./Button/Button";
import imageAPI from "../services/image-api";

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

    if (prevQuery !== nextQuery || prevPage !== nextPage) {
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
    const imgForModal = event.currentTarget.alt;
    this.setState({ showModal: true, largeImg: imgForModal });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  render() {
    const { data, status, query } = this.state;

    if (status === "idle") {
      return (
        <>
          <Searchbar onSubmit={this.handleSubmit} />
          <ToastContainer />
          <h1>Введите запрос</h1>
        </>
      );
    }

    if (status === "pending") {
      return (
        <Loader
          type="TailSpin"
          color="#00BFFF"
          height={80}
          width={80}
          timeout={3000}
          style={{ textAlign: "center" }}
        />
      );
    }

    // if (status === "rejected") {
    //   return <h2>{error.message}</h2>;
    // }

    if (status === "resolved") {
      return (
        <div className="container">
          <Searchbar onSubmit={this.handleSubmit} />
          <ImageGallery data={data} handleLargeImage={this.handleLargeImage} />
          {data.length !== 0 && <Button handleLoadMore={this.handleLoadMore} />}
          {data.length === 0 && <h2>По запросу "{query}" ничего не найдено</h2>}
          <ToastContainer />
        </div>
      );
    }
  }
}

export default App;
