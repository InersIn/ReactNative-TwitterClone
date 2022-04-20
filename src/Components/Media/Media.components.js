/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Image} from 'react-native';

export default class Media extends React.Component {
  constructor(props) {
    super(props);
  }

  RenderImage(props) {
    const RadiusStyle = [
      {borderTopLeftRadius: 15},
      {borderBottomLeftRadius: 15},
      {borderTopRightRadius: 15},
      {borderBottomRightRadius: 15},
    ];
    const listMedias = props.lists.map((data, index) => {
      var radius;
      var size;
      if (props.lists.length === 1) {
        radius = {borderRadius: 15};
        size = {width: '100%', height: '100%'};
      } else {
        if (index === 3 && index === props.lists.length) {
          radius = [RadiusStyle[1], RadiusStyle[3]];
          size = {
            width: '100%',
            height: '50%',
          };
        } else {
          radius = RadiusStyle[index];
          size = {
            width: props.lists.length > 290 ? '100%' : 100 / 2 + '%',
            height: props.lists.length > 2 ? '50%' : '100%',
          };
        }
      }
      return (
        <Image
          key={data.id_str + 'media-'}
          style={[size, radius]}
          source={{
            uri: data.media_url_https,
          }}
        />
      );
    });
    return listMedias;
  }

  render() {
    const containerMedia = this.props.media;
    var containerHeight = 0;
    containerMedia.forEach((element, index) => {
      containerHeight += element.sizes.small.h;
    });

    if (containerMedia.length > 1) {
      if (containerHeight / 2 > 400) {
        containerHeight = 400;
      } else {
        containerHeight = containerHeight / 2;
      }
    } else {
      if (containerHeight > 400) {
        containerHeight = 400;
      }
    }

    return (
      <View
        style={{
          height: containerHeight,
          width: '100%',
          backgroundColor: '#0F0F0F',
          borderRadius: 15,
          marginTop: 5,
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'wrap',
        }}>
        <this.RenderImage lists={containerMedia} />
      </View>
    );
  }
}
