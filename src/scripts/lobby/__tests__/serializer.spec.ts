import { onlyOnePlayer } from '../__mocks__/challengeList.mock';
import $ from 'jquery'
import serializer from '../serializer'
import { gcSelectors } from '@/shared/gc/selectors';

describe('serializer', () => {

  describe('serialize player', () => {
    test('challengeList', () => {
      const serializedPlayer = serializer.serializePlayer($(onlyOnePlayer)[0], gcSelectors.challengeList.player)
      expect(serializedPlayer).toMatchObject({
        name: 'P3DRO',
        kdr: 1.4,
        id: '581289'
      })
    })
  })

})