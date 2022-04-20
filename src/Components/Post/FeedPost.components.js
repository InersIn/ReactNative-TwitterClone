/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';

import {PhotoProfile, Media} from '../../Components';

import {
  LikePost,
  LikedPost,
  CommentPost,
  SharePost,
  RetweetPost,
  RetweetedPost,
} from '../../Components';

const CountConverter = count => {
  const strCount = String(count);
  if (strCount.length > 6) {
    return strCount.length === 7
      ? strCount[0] + 'M'
      : strCount.slice(0, 2) + '.' + strCount[3] + 'M';
  } else if (strCount.length > 4 && strCount.length <= 6) {
    return strCount.length === 6
      ? strCount.slice(0, 3) + 'K'
      : strCount.slice(0, 2) + '.' + strCount[3] + 'K';
  } else if (strCount.length === 4) {
    return strCount[0] + 'K';
  } else if (strCount === 0) {
    return '';
  } else {
    return strCount;
  }
};

export default class FeedPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      PostId: this.props.PostId,
      name: this.props.name,
      username: this.props.username,
      profilePicture: this.props.profilePicture,
      date: this.props.PostDetails.date,
      fullText: this.props.PostDetails.fullText,
      media: this.props.PostDetails.media,
      liked: {count: this.props.PostDetails.liked, status: false},
      retweets: {count: this.props.PostDetails.retweets, status: false},
      reply: {count: this.props.PostDetails.reply, status: false},
      hashtags: this.props.hashtags,
      urls: this.props.urls,
      mentions: this.props.mentions,
    };
    this.CounterHandler = this.CounterHandler.bind(this);
    this.RenderTweetFullText = this.RenderTweetFullText.bind(this);
  }

  GeneratedPostDate(date) {
    const DatePost = Math.floor(
      (Date.now() - new Date(Date.parse(date)).getTime()) / 1000 / 60 / 60,
    );
    if (DatePost / 24 < 1) {
      return DatePost + 'h';
    } else if (DatePost / 24 <= 7) {
      return Math.floor(DatePost / 24) + 'd';
    } else if (
      DatePost / 24 > 7 &&
      new Date(Date.parse(date)).getFullYear() === new Date().getFullYear()
    ) {
      const FullDate = new Date(Date.parse(date));
      return FullDate.getDate() + ' ' + FullDate.toDateString().split(' ')[1];
    } else {
      const FullDate = new Date(Date.parse(date));
      return (
        FullDate.getDate() +
        ' ' +
        FullDate.toDateString().split(' ')[1] +
        ' ' +
        FullDate.getFullYear().toString().slice(2, 4)
      );
    }
  }

  CounterHandler(state) {
    this.setState(state);
  }

  RenderTweetFullText(fullText, id) {
    var listComponents = [];
    var key = id + new Date().getTime() + new Date().getMilliseconds();
    if (typeof this.state.hashtags !== 'undefined') {
      const length = this.state.hashtags.length;
      listComponents.push(
        <Text key={key} style={styles.PostContentDescription}>
          {fullText.substr(0, this.state.hashtags[0].indices[0] + 2)}
        </Text>,
      );
      this.state.hashtags.map(({text}) => {
        var idx = fullText.indexOf('#' + text);
        var hashtag = fullText.substring(idx, idx + text.length + 1);
        listComponents.push(
          <TouchableOpacity
            key={id + new Date().getTime() + new Date().getMilliseconds()}
            onPress={() => {
              Alert.alert(
                'Service Belum Tersedia',
                'Sedang dalam proses pengembangan',
              );
            }}>
            <Text
              style={[
                styles.PostContentDescription,
                styles.PostContentEntities,
              ]}>
              {hashtag}
            </Text>
          </TouchableOpacity>,
        );
      });
      listComponents.push(
        <Text
          key={id + new Date().getTime() + new Date().getMilliseconds()}
          style={styles.PostContentDescription}>
          {fullText.substr(
            this.state.hashtags[length - 1].indices[1] + 3,
            fullText.length,
          )}
        </Text>,
      );
    } else {
      listComponents.push(
        <Text key={key} style={styles.PostContentDescription}>
          {fullText}
        </Text>,
      );
    }
    return (
      <View key={new Date().getTime() + new Date().getMilliseconds()}>
        {listComponents}
      </View>
    );
  }

  PostComponents(props) {
    const post = props.props;
    return (
      <View style={styles.PostContainer} key={post.PostId}>
        <View style={[styles.Post, false ? '' : styles.postPaddingTop]}>
          <View style={styles.PostProfileIcon}>
            <PhotoProfile.Normal url={post.profilePicture} />
          </View>
          <View style={styles.PostMain}>
            <View style={styles.PostDetails}>
              <View style={styles.PostDetailsName}>
                <Text style={styles.PostDetailsNameItems}>
                  {post.name.slice(0, 16)}
                </Text>
              </View>
              <View style={styles.PostDetailsUsername}>
                <Text>@{post.username.slice(0, 15)}</Text>
              </View>
              <View style={styles.PostDetailsTime}>
                <Text>· {props.GeneratedPostDate(post.date)}</Text>
              </View>
            </View>
            <View style={styles.PostContent}>
              {props.RenderTweetFullText(post.fullText, post.PostId)}
              {typeof post.media !== 'undefined' ? (
                <TouchableOpacity style={{backgroundColor: 'transparent'}}>
                  <Media media={post.media} />
                </TouchableOpacity>
              ) : null}
            </View>
            <View style={styles.PostActions}>
              <View style={styles.PostActionsItems}>
                <CommentPost />
                <Text style={styles.PostActionsCount}>
                  {CountConverter(post.reply.count)}
                </Text>
              </View>
              <View
                style={styles.PostActionsItems}
                onTouchEnd={() => {
                  post.liked.status ? post.liked.count-- : post.liked.count++;
                  props.counterHandler({
                    liked: {
                      count: post.liked.count,
                      status: !post.liked.status,
                    },
                  });
                }}>
                {post.liked.status ? <LikedPost /> : <LikePost />}
                <Text style={styles.PostActionsCount}>
                  {CountConverter(post.liked.count)}
                </Text>
              </View>
              <View
                style={styles.PostActionsItems}
                onTouchEnd={() => {
                  post.retweets.status
                    ? post.retweets.count--
                    : post.retweets.count++;
                  props.counterHandler({
                    retweets: {
                      count: post.retweets.count,
                      status: !post.retweets.status,
                    },
                  });
                }}>
                {post.retweets.status ? <RetweetedPost /> : <RetweetPost />}
                <Text style={styles.PostActionsCount}>
                  {CountConverter(post.retweets.count)}
                </Text>
              </View>
              <View
                style={styles.PostActionsItems}
                onTouchEnd={event => {
                  console.log('Share');
                }}>
                <SharePost />
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }

  render() {
    return (
      <this.PostComponents
        props={this.state}
        counterHandler={this.CounterHandler}
        RenderTweetFullText={this.RenderTweetFullText}
        GeneratedPostDate={this.GeneratedPostDate}
      />
    );
  }
}

const styles = StyleSheet.create({
  PostContainer: {
    display: 'flex',
    flexDirection: 'column',
    borderTopWidth: 0.3,
    borderBottomWidth: 0.3,
    borderColor: '#DADADA',
  },
  PostRecommendation: {
    height: 29,
    backgroundColor: 'white',
    paddingLeft: 65,
    justifyContent: 'center',
  },
  PostRecommendationWrapper: {
    display: 'flex',
    flexDirection: 'row',
  },
  PostRecommendationDetails: {
    color: '#687684',
  },
  Post: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    backgroundColor: 'white',
    paddingLeft: 12,
    paddingRight: 12,
    paddingBottom: 11,
  },
  PostProfileIcon: {
    paddingRight: 12,
    width: 75,
    height: '100%',
    backgroundColor: 'white',
  },
  PostMain: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    height: '100%',
  },
  PostDetails: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    backgroundColor: 'white',
  },
  PostDetailsName: {
    marginRight: 5,
  },
  PostDetailsNameItems: {
    fontFamily: 'Helvetica Neue',
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  PostDetailsUsername: {
    fontFamily: 'Helvetica Neue',
    marginRight: 5,
    color: '#687684',
  },
  PostContent: {
    flex: 1,
    width: '100%',
    lineHeight: 5,
    marginTop: 5,
    marginBottom: 11,
  },
  PostContentDescription: {
    fontFamily: 'Helvetica Neue',
    fontSize: 16,
    color: 'black',
    lineHeight: 23,
  },
  PostContentEntities: {
    color: '#1DA1F2',
  },
  PostActions: {
    display: 'flex',
    flexDirection: 'row',
    height: 30,
    width: '100%',
    backgroundColor: 'white',
  },
  PostActionsItems: {
    color: 'white',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  PostActionsCount: {
    paddingLeft: 10,
  },
  postPaddingTop: {
    paddingTop: 11,
  },
});
