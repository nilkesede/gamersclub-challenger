import '../number.setup'

describe('NumberSetup',  ()  => {
  describe('percentageOf',  ()  => {
    it('should return 50% when partialValue is 50 and totalValue is 100',  ()  => {
      expect(50 .percentageOf(100)).toEqual( '50%' )
    })
    it('should return 50% when partialValue is 50 and totalValue is 100 with fixedDecimal',  ()  => {
      expect(50 .percentageOf(100, 2)).toEqual( '50.00%' )
    })
  })

  describe('percentage',  ()  => {
    it('should return 50% when partialValue is 50 and totalValue is 100',  ()  => {
      expect(100 .percentage(50)).toEqual( '50%' )
    })
    it('should return 50% when partialValue is 50 and totalValue is 100 with fixedDecimal',  ()  => {
      expect(100 .percentage(50, 2)).toEqual( '50.00%' )
    })
  })
})