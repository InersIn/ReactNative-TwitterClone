/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StatusBar,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';

import {TweetCreate, TweetImages, TweetGif} from '../../Components';
import {FeedPost, ComponentLoading} from '../../Components';

export default class Feed extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {
      finish: false,
      showCreatePost: false,
      lazyLoad: {prev: 0, next: 10},
      listPosts: [],
    };
    this.rawPost = [];
    this.PostIds = {};
    this.CountLoad = 10;
  }

  LoadPost() {
    const post = this.rawPost.slice(
      this.state.lazyLoad.prev,
      this.state.lazyLoad.next,
    );
    if (post.length > 0) {
      const Post = post.map(data => {
        const PostId = data.Post.id_str;
        const name = data.User.user.name;
        const username = data.User.user.screen_name;
        const date = data.Post.created_at;
        const fullText = data.Post.full_text;
        const media = data.Post.entities.media;
        const profileImage = data.User.user.profile_image_url_https;
        const liked = data.Post.favorite_count;
        const retweets = data.Post.quote_count + data.Post.retweet_count;
        const reply = data.Post.reply_count;
        const hashtags = data.Post.entities.hashtags;
        const urls = data.Post.entities.urls;
        const mentions = data.Post.entities.user_mentions;
        return (
          <FeedPost
            key={PostId}
            PostId={PostId}
            name={name}
            username={username}
            profilePicture={profileImage}
            PostDetails={{date, fullText, media, liked, retweets, reply}}
            hashtags={hashtags}
            urls={urls}
            mentions={mentions}
          />
        );
      });
      this.setState({listPosts: [...this.state.listPosts, Post]});
      this.setState({
        lazyLoad: {
          prev: this.state.lazyLoad.prev + this.CountLoad,
          next: this.state.lazyLoad.next + this.CountLoad,
        },
      });
    }
  }

  componentDidMount() {
    const PostsData = require('../../Database/posts.json');
    const UsersData = require('../../Database/users.json');

    for (let x = 0; x <= 60; x++) {
      var Userids = Math.floor(Math.random() * UsersData.length);
      var statusPost = true;

      while (statusPost) {
        var Postids = Math.floor(Math.random() * PostsData.length);
        if (typeof this.PostIds[Postids] === 'undefined') {
          statusPost = false;
          this.PostIds[Postids] = PostsData[Postids].id_str;
        }
      }
      this.rawPost.push({User: UsersData[Userids], Post: PostsData[Postids]});
    }
    this.LoadPost();
    const renderer = setInterval(() => {
      this.setState({finish: true});
      clearInterval(renderer);
    }, 500);
  }

  render() {
    return (
      <SafeAreaView>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        {this.state.showCreatePost ? (
          <View
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              zIndex: 9,
              opacity: 0.9,
            }}>
            <View
              style={{
                width: '100%',
                height: '100%',
                position: 'absolute',
                backgroundColor: 'white',
              }}
              onTouchStart={event => {
                this.setState({showCreatePost: !this.state.showCreatePost});
              }}
            />
            <View style={styles.CreateTweetContainer}>
              <View style={styles.CreateTweetOptoins}>
                <TouchableWithoutFeedback>
                  <TweetImages />
                </TouchableWithoutFeedback>
              </View>
              <View style={styles.CreateTweetOptoins}>
                <TouchableWithoutFeedback>
                  <TweetGif />
                </TouchableWithoutFeedback>
              </View>
            </View>
          </View>
        ) : null}
        <ScrollView
          bounces={false}
          alwaysBounceVertical={false}
          alwaysBounceHorizontal={false}
          onScroll={({nativeEvent}) => {
            if (
              Math.ceil(
                nativeEvent.contentOffset.y +
                  nativeEvent.layoutMeasurement.height,
              ) >= nativeEvent.contentSize.height
            ) {
              this.LoadPost();
            }
          }}>
          {!this.state.finish ? (
            <View style={{height: '100%'}}>
              <ComponentLoading />
            </View>
          ) : (
            this.state.listPosts
          )}
        </ScrollView>
        {this.state.finish ? (
          <TouchableWithoutFeedback
            onPress={event => {
              this.setState({showCreatePost: !this.state.showCreatePost});
            }}>
            <View style={styles.ButtonCreateTweet}>
              {this.state.showCreatePost ? (
                <TweetCreate />
              ) : (
                <Text style={{fontSize: 42, fontWeight: '300', color: 'white'}}>
                  +
                </Text>
              )}
            </View>
          </TouchableWithoutFeedback>
        ) : (
          <View />
        )}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  ButtonCreateTweet: {
    position: 'absolute',
    width: 60,
    height: 60,
    backgroundColor: '#1DA1F2',
    bottom: 18,
    right: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  CreateTweetContainer: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    bottom: 78,
    right: 14,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: 120,
    width: 62,
    // marginBottom: 10,
  },
  CreateTweetOptoins: {
    width: 48,
    height: 48,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
