import React from 'react'
import { View, Text } from 'react-native'
import Divider from './Divider'
import { moment } from '../Utilities'

const InfoPanel = ({ style, customDate = undefined, lastUpdatedTime, showDivider = true }) => {
  return (
    <View>
      <View style={[{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingLeft: 20,
          paddingRight: 20,
          paddingTop: 15,
          paddingBottom: 5 },
          style
      ]}>
        <Text style={{
          fontSize: 12,
          fontFamily:'Source Sans Pro',
          fontWeight: '600',
          color: 'gray'
        }}>
          {customDate
            ? moment(customDate).calendar().toUpperCase()
            : moment().format('dddd D MMMM').toUpperCase()
          }
        </Text>
        { lastUpdatedTime &&
          <Text style={{
            fontSize: 12,
            fontFamily:'Source Sans Pro',
            color: 'gray'
          }}>
            {'Last updated ' + lastUpdatedTime}
          </Text>
        }
      </View>
      { showDivider &&
        <Divider />
      }
    </View>
  )
}

export default InfoPanel
