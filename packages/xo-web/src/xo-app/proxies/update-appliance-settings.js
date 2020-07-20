import _ from 'intl'
import decorate from 'apply-decorators'
import Icon from 'icon'
import React from 'react'
import { Container } from 'grid'
import { form } from 'modal'
import { provideState, injectState } from 'reaclette'
import { updateProxyAppliance } from 'xo'

import HttpProxy from './http-proxy'

const Modal = decorate([
  provideState({
    effects: {
      onInputChange(_, { target: { name, value } }) {
        this.props.onChange({
          ...this.props.value,
          [name]: value,
        })
      },
    },
  }),
  injectState,
  ({ effects, value }) => (
    <Container>
      <HttpProxy onChange={effects.onInputChange} value={value.httpProxy} />
    </Container>
  ),
])

const updateApplianceSettings = async proxy => {
  let { httpProxy } = await form({
    defaultValue: {
      httpProxy: '',
    },
    render: props => <Modal {...props} />,
    header: (
      <span>
        <Icon icon='settings' /> {_('settings')}
      </span>
    ),
  })
  httpProxy = httpProxy.trim()
  await updateProxyAppliance(proxy, {
    httpProxy: httpProxy !== '' ? httpProxy : null,
  })
}

export { updateApplianceSettings as default }
