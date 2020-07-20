import _, { messages } from 'intl'
import decorate from 'apply-decorators'
import PropTypes from 'prop-types'
import React from 'react'
import SingleLineRow from 'single-line-row'
import { Col } from 'grid'
import { generateId } from 'reaclette-utils'
import { injectIntl } from 'react-intl'
import { provideState, injectState } from 'reaclette'

const HttpProxy = decorate([
  provideState({
    computed: {
      idHttpProxyInput: generateId,
    },
  }),
  injectIntl,
  injectState,
  ({ intl: { formatMessage }, onChange, state, value = '', ...props }) => (
    <SingleLineRow {...props}>
      <Col mediumSize={4}>
        <label htmlFor={state.idHttpProxyInput} style={{ cursor: 'pointer' }}>
          <strong>{_('httpProxy')}</strong>
        </label>
      </Col>
      <Col mediumSize={8}>
        <input
          className='form-control'
          id={state.idHttpProxyInput}
          name='httpProxy'
          onChange={onChange}
          placeholder={formatMessage(messages.httpProxyPlaceholder)}
          value={value}
        />
      </Col>
    </SingleLineRow>
  ),
])

HttpProxy.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
}

export { HttpProxy as default }
