import moment from 'moment'

function donationAdapter(donation) {
  return {
    id: donation.id,
    isHidden: donation.is_hidden,
    source: donation.source,
    externalId: donation.external_id,
    from: donation.from,
    amount: donation.amount / 100,
    commission: donation.amount / 100,
    text: donation.text.replaceAll('&quot;', '"'),
    adminComment: donation.admin_comment,
    status: donation.status,
    additionalData: donation.additional_data,
    paidAt: moment(donation.paid_at),
    createdAt: moment(donation.created_at),
    updatedAt: moment(donation.updated_at),
  }
}

export default donationAdapter
