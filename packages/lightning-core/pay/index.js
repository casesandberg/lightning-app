
import React from 'react'
import { connect } from 'react-redux'
import { Form, actions as formActions } from 'lightning-forms'
import { actions } from './reducer'
import { store } from 'lightning-store'
import { actions as accountsActions } from '../accounts'
import { CurrencyInput, Head, Input, Page } from '../common'
import { sanitizePaymentRequest } from '../helpers'

export const Pay = ({ isSynced, onMakePayment, onDecodePaymentRequest,
  onEditForm, onFetchAccount, onFetchChannels }) => {
  const fields = [
    {
      name: 'address',
      placeholder: 'Payment Request / Bitcoin Address',
      required: true,
      component: Input,
      disabled: !isSynced,
    },
    {
      name: 'amount',
      placeholder: 'Amount',
      required: true,
      component: CurrencyInput,
      disabled: !isSynced,
    },
  ]

  const handleSuccess = ({ address, amount }, clear) => {
    if (isSynced) {
      onMakePayment({ address, amount })
        .then(() => {
          onFetchAccount()
          onFetchChannels()
          clear()
        })
        // eslint-disable-next-line no-console
        .catch(console.error)
    }
  }

  const handleError = (errors) => {
    // eslint-disable-next-line no-console
    console.log('error', errors)
  }

  const handleChange = (change) => {
    if (change.address) {
      const paymentRequest = sanitizePaymentRequest(change.address)
      onDecodePaymentRequest({ paymentRequest })
        .then((decoded) => {
          const amount = decoded.num_satoshis
          onEditForm('pay', { amount })
        })
        // eslint-disable-next-line no-console
        .catch(console.error)
    }
  }

  return (
    <Page>
      <Head
        title="Make a Payment"
        body="Lightning payments will be instant, while on-chain Bitcoin
        transactions require at least one confirmation (approx. 10 mins)"
      />
      <Form
        name="pay"
        fields={ fields }
        submitLabel="Send Payment"
        clearLabel="Cancel"
        onChange={ handleChange }
        onSuccess={ handleSuccess }
        onError={ handleError }
      />
    </Page>
  )
}

export default connect(
  state => ({
    isSynced: store.getSyncedToChain(state),
  }), {
    onMakePayment: actions.makePayment,
    onDecodePaymentRequest: actions.decodePaymentRequest,
    onEditForm: formActions.editForm,
    onFetchAccount: accountsActions.fetchAccount,
    onFetchChannels: accountsActions.fetchChannels,
  }
)(Pay)

export { default as reducer, actions, selectors } from './reducer'
