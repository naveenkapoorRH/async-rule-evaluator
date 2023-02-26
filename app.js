
import { toFunction } from 'async-rule-evaluator'
var facts = {
  B:20,
  A:10,
  C:300,
    EXPS_EHR_STAT:'ANOTHER DOT',
    EXPS_EHR_VAL:'OK',
    RECORD_NAICS_NUM: '51113',
RCPT_BOOK_PRNT_PCT: 0, 
RCPT_BOOK_ONLINE_PCT: 10,
 RCPT_BOOK_OTH_PCT: -10,
 TYPE_CODE_STAT:"51113", 
 RCPT_COMSN_GSV_VAL:2,
 RCPT_COMSN_EARN_VAL:3, 
 RCPT_COMSN_AVG_RATE:4,
 TYPOP_CODE_STAT:"4X", 
 RCPT_OWN_VAL:0,
 RCPT_COMSN_EARN_VAL:3,
 RCPT_MOTR_HAZRD_PCT:"ANDY",RCPT_MOTR_HAZRD_STAT:"CD",
//   RCPT_OWN_VAL:4,
RCPT_VAL:5,
 RCPT_TOT_VAL:5,
 INV_CY_TOT:10,  INV_CY_LIFO_VAL:3, INV_CY_NONLIFO_TOT:6
  
}
var tArr =
    [
      `sum(A,B) == C+0`,
      `A == B+0`, // treats the entire string as a single object
      `A+B == C`,
      // `A== B+0`,   
      //  `A != undefined`,
      //   // 1 ASYNC
      //   `aggregate("RCPT_TOT","naics = '454390'", "sum")`,
      //   //3
      //   `substr(RECORD_NAICS_NUM,0,5)== "51113" and sum(RCPT_BOOK_PRNT_PCT,  RCPT_BOOK_ONLINE_PCT, RCPT_BOOK_OTH_PCT) ==0`,

    
      //   // //5  TYPE_CODE_STAT:"51113", RCPT_COMSN_GSV_VAL:2,RCPT_COMSN_EARN_VAL:3, RCPT_COMSN_AVG_RATE:4
      //   `TYPE_CODE_STAT=="51113" and RCPT_COMSN_GSV_VAL not in (0,1) and RCPT_COMSN_EARN_VAL not in (0,1) and RCPT_COMSN_AVG_RATE not in (0,1)`,

      //   // //7 TYPOP_CODE_STAT:"4X", RCPT_OWN_VAL:0,RCPT_COMSN_EARN_VAL:3.RCPT_OWN_VAL:4,RCPT_TOT_VAL:5
      //    `TYPOP_CODE_STAT == "4X" and RCPT_OWN_VAL == 0 and RCPT_COMSN_GSV_VAL != RCPT_TOT_VAL and RCPT_COMSN_GSV_VAL < RCPT_TOT_VAL and RCPT_VAL == sum(RCPT_COMSN_GSV_VAL, RCPT_COMSN_EARN_VAL)`,

      //   // // 9 INV_CY_TOT:10, . INV_CY_LIFO_VAL:3, INV_CY_NONLIFO_TOT:6
      //   `INV_CY_TOT != sum(INV_CY_LIFO_VAL, INV_CY_NONLIFO_TOT)`,

      //   // // 15 RCPT_MOTR_HAZRD_PCT:"ANDY",RCPT_MOTR_HAZRD_STAT:"CD"
      //   `RCPT_MOTR_HAZRD_PCT!= 30 and substr(RECORD_NAICS_NUM,0,3) =="511" and RCPT_MOTR_HAZRD_STAT =="CD" and RCPT_MOTR_HAZRD_PCT ==0`,

      //   // // 22
      //  `substr(RECORD_NAICS_NUM,0,5) == "51113" and sum(RCPT_BOOK_PRNT_PCT,  RCPT_BOOK_ONLINE_PCT, RCPT_MOTR_HAZRD_PCT) != 0`,

      //   // // 33
      //    `substr(RECORD_NAICS_NUM,1,2) =="11" and substr(RECORD_NAICS_NUM,1,3) !="624" and EXPS_EHR_VAL !="SomeDOT" and EXPS_EHR_STAT =="ANOTHER DOT" or EXPS_EHR_VAL == "OK"`

    ]
let concat = (...args) =>{ return args.reduce((a, b) => a +''+ b, '') }

let  sleep = async function(seconds) {
    return new Promise((resolve) =>setTimeout(resolve, seconds * 1000));
    }

let sum = (...args) => {
    return args.reduce((a, b) => a + b, 0);
  }

// aggregate('RCPT_TOT', 'naics ="51113"', 'sum')

  let  aggregate = async function (variable, where,type) { 
    await sleep(0)

    let sql = `select  sum(data_version_value::INTEGER) from v_survey_details_flags_ac where rvname = ${variable} and ${where} `
  

    return (sql) 
  }






let functions = {concat, aggregate, sum}

async function runFilter(input, data) {
    const fn = toFunction(input,{functions})
    return fn(data);
  }
  
 tArr.map(async function(t, index){
    // if(index > 0) return;
    let rF = await runFilter(t, facts)
  console.log("🚀 ~ file: app.js:87 ~ rF", t, rF)
   
})









