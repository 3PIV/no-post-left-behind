// PostBox.js
import React, { Component } from "react";
import PostList from "./PostList";
import PostForm from "./PostForm";
import PostContent from "./PostContent";
import { Container, Media, Row, Col } from "reactstrap";
import "whatwg-fetch";
import "./PostBox.css";
import theLogo from "./images/postguard.png";

class PostBox extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      folderdata: [],
      contentdata: [],
      error: null,
      folder: "",
      filter: "",
      postId: ""
    };
    this.pollInterval = null;
  }

  setActivePost(newPostId) {
    this.setState({ postId: newPostId }, console.log(this.state.postId));
    this.loadPostContentById(newPostId);
  }

  componentDidMount() {
    this.loadPostsFromServer();
    this.loadFoldersFromServer();
    if (!this.pollInterval) {
      //this.pollInterval = setInterval(this.loadPostsFromServer, 200000);
    }
    fetch("/api")
      .then(response => {
        if (!response.ok) {
          throw new Error(`status ${response.status}`);
        }
        return response.json();
      })
      .then(json => {
        this.setState({
          message: json.message,
          fetching: false
        });
      })
      .catch(e => {
        this.setState({
          message: `API call failed: ${e}`,
          fetching: false
        });
      });
  }

  componentWillUnmount() {
    if (this.pollInterval) clearInterval(this.pollInterval);
    this.pollInterval = null;
  }

  loadPostsFromServer = () => {
    // fetch returns a promise. If you are not familiar with promises, see
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
    fetch("/api/posts")
      .then(data => data.json())
      .then(res => {
        if (!res.success) this.setState({ error: res.error });
        else this.setState({ data: res.data });
        console.log(res.data);
      })
      .catch(e => console.error(e));
  };

  loadFoldersFromServer = () => {
    // fetch returns a promise. If you are not familiar with promises, see
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
    fetch("/api/folders")
      .then(folderdata => folderdata.json())
      .then(res => {
        if (!res.success) this.setState({ error: res.error });
        else this.setState({ folderdata: res.folderdata });
      })
      .catch(e => console.error(e));
  };

  loadFilteredPosts = () => {
    // fetch returns a promise. If you are not familiar with promises, see
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
    fetch("/api/posts/?:folder&:filter")
      .then(data => data.json())
      .then(res => {
        if (!res.success) this.setState({ error: res.error });
        else this.setState({ data: res.data });
      })
      .catch(e => console.error(e));
  };

  loadPostContentById = postId => {
    // fetch returns a promise. If you are not familiar with promises, see
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
    fetch(`/api/posts/${postId}`)
      .then(contentdata => contentdata.json())
      .then(res => {
        console.log(res);
        if (!res.success) this.setState({ error: res.error });
        else this.setState({ contentdata: res.data[0] });
      })
      .catch(e => console.error(e));
  };

  render() {
    return (
      <Container className="mainContainer" fluid={true}>
        <Row className="form">
          <Col
            className="logoContainer"
            md={{ size: 1, offset: 1 }}
            xs={{ size: 1, offset: 0 }}
          >
            <Media className="logo" object src={theLogo} alt="Generic Logo" />
          </Col>
          <Col
            className="form"
            md={{ size: 9, offset: 0 }}
            xs={{ size: 11, offset: 0 }}
          >
            <PostForm
              folderData={this.state.folderdata}
              setFilters={this.loadFilteredPosts}
            />
          </Col>
        </Row>
        <Row>
          <Col
            className="postheader"
            md={{ size: 10, offset: 1 }}
            xs={{ size: 12, offset: 0 }}
          >
            <h2>Posts:</h2>
          </Col>
        </Row>
        <Row className="postList">
          <Col
            className="posts"
            md={{ size: 2, offset: 1 }}
            xs={{ size: 3, offset: 0 }}
          >
            <PostList
              updatePostID={this.setActivePost.bind(this)}
              data={this.state.data}
            />
          </Col>
          <Col
            className="postContent"
            md={{ size: 8, offset: 0 }}
            xs={{ size: 9, offset: 0 }}
          >
            <PostContent postdata={this.state.contentdata} />
          </Col>
        </Row>
        <Row className="footer" fluid="true">
          <Col className="footerContent" xs={{ size: 10, offset: 1 }}>
            This is the footer.
          </Col>
        </Row>
      </Container>
    );
  }
}

export default PostBox;
