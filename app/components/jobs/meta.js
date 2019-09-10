import React from 'react'
import Colors from 'enlist/app/styles/colors'

import { formatDate } from 'enlist/app/utils'

import { Text, View } from 'react-native'

const getLocation = job => {
  let location

  if (job.get('remote')) {
    return 'Remote'
  } else {
    return `${job.get('city')}, ${job.get('state')}`
  }
}

const getStatusColor = job => {
  let statuses = ['inactive', 'active', 'paused', 'closed']
  let statusColors = ['#C1C7D4', '#7DDC15', '#ED7E2B', '#F21D1D']

  let color = statusColors[job.get('status')]

  if (color) {
    return color
  } else {
    return head(statusColors)
  }
}

const JobMetadata = props => {
  const { job, style } = props

  let color = getStatusColor(job)
  let location = getLocation(job)
  let publishedAt = formatDate(job.get('createdAt'), 'MMM DD')

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          borderBottomWidth: 1,
          borderBottomColor: Colors.mediumGray
        },
        style
      ]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View
          style={{
            borderRadius: 999,
            height: 6,
            width: 6,
            backgroundColor: color
          }}
        />
        <Text
          style={{
            color: Colors.textGray,
            marginLeft: 5,
            fontWeight: '400',
            fontSize: 12
          }}
        >
          Active
        </Text>
      </View>

      <Text style={{ color: Colors.textGray, marginLeft: 5, marginRight: 5 }}>
        ·
      </Text>

      <Text style={{ color: Colors.textGray, fontSize: 12 }}>
        {location}
      </Text>

      <Text style={{ color: Colors.textGray, marginLeft: 5, marginRight: 5 }}>
        ·
      </Text>

      <Text
        style={{
          color: Colors.textGray,
          marginLeft: 5,
          fontWeight: '400',
          fontSize: 12
        }}
      >
        Published {publishedAt}
      </Text>
    </View>
  )
}

module.exports = JobMetadata
