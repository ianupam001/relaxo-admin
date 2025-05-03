export interface Bill {
  _id: string
  sms: string
  email: string
  customerData: {
    phone: string
  }
  loyaltyData: {
    cardNum: string
    cardHolderName: string
    pointsEarned: number
    pointsRedeemed: number
    pointsAvailable: number
    pointsBalance: number
  }
  storeData: {
    storeAddress: string
    pinCode: string
    storeNumberPrimary: string
    displayAddress: string
    storeGstNumber: string
  }
  companyData: {
    name: string
    address: string
    pinCode: string
    cin: string
    localCompanyAddress: string
  }
  transactionalData: {
    invoiceType: string
    invoiceNumber: string
    invDate: string
    invTime: string
    transactionType: string
  }
  paymentData: {
    paymentMethods: {
      name: string
      amount: number
    }[]
    status: string
  }
  billAmountData: {
    totalQty: number
    netPayableAmount: number
    saleCurrency: string
    amountInWords: string
  }
  taxesData: {
    distributedTax: {
      taxableAmount: number
      cgst: number
      sgst: number
    }[]
  }
  billFooterData: {
    disclaimer: string
  }
  productsData: {
    name: string
    productCode: string
    quantity: number
    unitAmount: number
    totalAmount: number
    hsnCode: string
    gstPercent: string
  }[]
  createdAt: string
  updatedAt: string
  __v: number
}
