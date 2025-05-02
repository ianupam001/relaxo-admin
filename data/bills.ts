import type { Bill } from "@/types/bill"

export const billsData: Bill[] = [
  {
    _id: "681308751638a87a7e5ea6c2",
    sms: "false",
    email: "true",
    customerData: {
      phone: "9898989898",
    },
    loyaltyData: {
      cardNum: "L00062347",
      cardHolderName: "Ravi Kumar",
      pointsEarned: 0,
      pointsRedeemed: 0,
      pointsAvailable: 0,
      pointsBalance: 0,
    },
    storeData: {
      storeAddress: "3rd Floor, Phoenix Mall, Lower Parel, Mumbai",
      pinCode: "400013",
      storeNumberPrimary: "022-55667788",
      displayAddress: "MUMBAI PHOENIX MALL",
      storeGstNumber: "27AAACR0259D1ZO",
    },
    companyData: {
      name: "Relaxo Footwears Limited",
      address: "Aggarwal City Square, District Centre, Manglam Palace, Sector-3, Rohini, DELHI",
      pinCode: "110085",
      cin: "L74899DL1984PLC019097",
      localCompanyAddress: "3rd Floor, Phoenix Mall, Mumbai",
    },
    transactionalData: {
      invoiceType: "Tax Invoice",
      invoiceNumber: "02223R495009875",
      invDate: "25/04/2024",
      invTime: "2:10:00 PM",
      transactionType: "BM",
    },
    paymentData: {
      paymentMethods: [
        {
          name: "Credit Card",
          amount: 1350,
        },
      ],
      status: "paid",
    },
    billAmountData: {
      totalQty: 4,
      netPayableAmount: 1350,
      saleCurrency: "INR",
      amountInWords: "ONE THOUSAND THREE HUNDRED FIFTY RUPEES ONLY",
    },
    taxesData: {
      distributedTax: [
        {
          taxableAmount: 1205.36,
          cgst: 72.32,
          sgst: 72.32,
        },
      ],
    },
    billFooterData: {
      disclaimer: "Thank you for shopping at Relaxo.",
    },
    productsData: [
      {
        name: "Sports Shoes",
        productCode: "I0099123",
        quantity: 2,
        unitAmount: 600,
        totalAmount: 1200,
        hsnCode: "64041100",
        gstPercent: "12",
      },
      {
        name: "Shoe Polish Black",
        productCode: "I0032121",
        quantity: 2,
        unitAmount: 75,
        totalAmount: 150,
        hsnCode: "34051000",
        gstPercent: "18",
      },
    ],
    createdAt: "2025-05-01T05:36:53.859Z",
    updatedAt: "2025-05-01T05:36:53.859Z",
    __v: 0,
  },
  {
    _id: "681308631638a87a7e5ea6c0",
    sms: "true",
    email: "true",
    customerData: {
      phone: "9876543210",
    },
    loyaltyData: {
      cardNum: "L00078901",
      cardHolderName: "Anjali Sharma",
      pointsEarned: 10,
      pointsRedeemed: 5,
      pointsAvailable: 20,
      pointsBalance: 25,
    },
    storeData: {
      storeAddress: "Plot No. 45, Sector 18, Noida, Uttar Pradesh",
      pinCode: "201301",
      storeNumberPrimary: "0120-1234567",
      displayAddress: "NOIDA SECTOR 18",
      storeGstNumber: "09AAACR0259D1Z1",
    },
    companyData: {
      name: "Relaxo Footwears Limited",
      address: "Aggarwal City Square, District Centre, Manglam Palace, Sector-3, Rohini, DELHI",
      pinCode: "110085",
      cin: "L74899DL1984PLC019097",
      localCompanyAddress: "DLF Mall, Sector 18, Noida, U.P.",
    },
    transactionalData: {
      invoiceType: "Retail Invoice",
      invoiceNumber: "02223R495008721",
      invDate: "21/04/2024",
      invTime: "3:45:00 PM",
      transactionType: "BM",
    },
    paymentData: {
      paymentMethods: [
        {
          name: "UPI",
          amount: 999,
        },
      ],
      status: "paid",
    },
    billAmountData: {
      totalQty: 3,
      netPayableAmount: 999,
      saleCurrency: "INR",
      amountInWords: "NINE HUNDRED NINETY NINE RUPEES ONLY",
    },
    taxesData: {
      distributedTax: [
        {
          taxableAmount: 891.07,
          cgst: 53.97,
          sgst: 53.97,
        },
      ],
    },
    billFooterData: {
      disclaimer: "Prices inclusive of all taxes. No return/exchange.",
    },
    productsData: [
      {
        name: "Casual Sandals Men",
        productCode: "I0089012",
        quantity: 1,
        unitAmount: 499,
        totalAmount: 499,
        hsnCode: "64041100",
        gstPercent: "12",
      },
      {
        name: "Women Flip-Flop Red",
        productCode: "I0064782",
        quantity: 2,
        unitAmount: 250,
        totalAmount: 500,
        hsnCode: "64022090",
        gstPercent: "5",
      },
    ],
    createdAt: "2025-05-01T05:36:35.303Z",
    updatedAt: "2025-05-01T05:36:35.303Z",
    __v: 0,
  },
  {
    _id: "681307aa1638a87a7e5ea6bc",
    sms: "true",
    email: "false",
    customerData: {
      phone: "9412153811",
    },
    loyaltyData: {
      cardNum: "L00051313",
      cardHolderName: "vineet gupta",
      pointsEarned: 6,
      pointsRedeemed: 0,
      pointsAvailable: 12,
      pointsBalance: 18,
    },
    storeData: {
      storeAddress: "SHOP AT PLOT NO. AE - 22 A & B, KANTH ROAD CIVIL LINES, MORADABAD UTTAR P.",
      pinCode: "2440001",
      storeNumberPrimary: "0591-2975700",
      displayAddress: "MORADABAD CIVIL LINES NEW",
      storeGstNumber: "09AAACR0259D1ZO",
    },
    companyData: {
      name: "Relaxo Footwears Limited",
      address: "Aggarwal City Square, District Centre, Manglam Palace, Sector-3, Rohini, DELHI",
      pinCode: "110085",
      cin: "L74899DL1984PLC019097",
      localCompanyAddress:
        "Shop No.-17,24,24A,27 & 27A, GF, Kumar Residency Plaza, Plot No-ML 01,Sec –11, Vasundhra, Gaziabad U.P.",
    },
    transactionalData: {
      invoiceType: "Tax Invoice",
      invoiceNumber: "02223R495005669",
      invDate: "16/09/2022",
      invTime: "11:54:11 AM",
      transactionType: "BM",
    },
    paymentData: {
      paymentMethods: [
        {
          name: "Cash",
          amount: 628.5,
        },
      ],
      status: "paid",
    },
    billAmountData: {
      totalQty: 2,
      netPayableAmount: 628.5,
      saleCurrency: "INR",
      amountInWords: "SIX HUNDRED TWENTY EIGHT RUPEES AND FIFTY PAISA ONLY",
    },
    taxesData: {
      distributedTax: [
        {
          taxableAmount: 578.96,
          cgst: 24.77,
          sgst: 24.77,
        },
      ],
    },
    billFooterData: {
      disclaimer: "All prices are inclusive of GST. Subject to Delhi Jurisdiction.",
    },
    productsData: [
      {
        name: "BHG-127 SUPER GENTS 11,BLACK YELLOW",
        productCode: "I0072897",
        quantity: 1,
        unitAmount: 329.5,
        totalAmount: 329.5,
        hsnCode: "64022090",
        gstPercent: "12",
      },
      {
        name: "LOAFER SOCKS M3 GENTS",
        productCode: "I0052749",
        quantity: 1,
        unitAmount: 299,
        totalAmount: 299,
        hsnCode: "61151100",
        gstPercent: "5",
      },
    ],
    createdAt: "2025-05-01T05:33:30.986Z",
    updatedAt: "2025-05-01T05:33:30.986Z",
    __v: 0,
  },
]
