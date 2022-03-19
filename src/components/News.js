import React, { Component } from "react";
import NewsItem from "./NewsItem";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
    };
  }

  async updateNews(pageNo) {
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=48fbae654fe8434a900826bce0cc915f&page=${
      this.state.page
    }`;
    let data = await fetch(url);
    let parseData = await data.json();
    this.setState({
      articles: parseData.articles,
      totalResults: parseData.totalResults,
    });
    this.props.setProgress(100);
  }

  async componentDidMount() {
    this.updateNews();
  }

  handlePreviousClick = async () => {
    this.setState({page:this.state.page - 1});
    this.updateNews();
  };

  handleNextClick = async () => {
    this.setState({page:this.state.page + 1});
    this.updateNews();
  };

  fetchMoreData = async () => {
    this.setState({page: this.state.page + 1})
    const url = `https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=48fbae654fe8434a900826bce0cc915f&page=${
      this.state.page
    }`;
    let data = await fetch(url);
    let parseData = await data.json();
    this.setState({
      articles: this.setState.articles.concat(parseData.articles),
      totalResults: parseData.totalResults,
    });
  };

  render() {
    return (
      <>
        <h1 className="text-center" style={{margin:'35px 0px'}}>News Top Headlines</h1>

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<h4>Loading...</h4>}
        >

        <div className="container my3">
          <div className="row">
            {this.state.articles.map((data) => (
              <div className="col-md-4" key={data.url}>
                <NewsItem
                  title={data.title ? data.title.slice(0, 45) : ""}
                  description={
                    data.description ? data.description.slice(0, 100) : ""
                  }
                  imageurl={data.urlToImage}
                  newsUrl={data.url}
                  author={data.author}
                  date={data.publishedAt}
                  source={data.source.name}
                />
              </div>
            ))}
          </div>
          </div>
        </InfiniteScroll>
        <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.handlePreviousClick}
          >
            {" "}
            &larr; Previous
          </button>
          <button
            type="button"
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div>
      </>
    );
  }
}

export default News;

//48fbae654fe8434a900826bce0cc915f
