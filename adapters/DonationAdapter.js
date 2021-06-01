function donationAdapter(donation) {
  return {
    id: donation.id,
    isHidden: donation.is_hidden,
    source: donation.source,
    externalId: donation.external_id,
    from: donation.from,
    amount: donation.amount / 100,
    commission: donation.amount / 100,
    text: donation.text,
    adminComment: donation.admin_comment,
    status: donation.status,
    additionalData: donation.additional_data,
    paidAt: donation.paid_at,
    createdAt: donation.created_at,
    updatedAt: donation.updated_at,
  }
}

export default donationAdapter
