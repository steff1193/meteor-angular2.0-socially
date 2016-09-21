import {Parties} from '../../../both/collections/parties.collection';
import {Meteor} from 'meteor/meteor';
import {Counts} from 'meteor/tmeasday:publish-counts';

function buildQuery(partyId?: string): Object {
  const isAvailable = {
    $or: [
      { 'public': true },
      {
        $and: [
          { owner: this.userId },
          { owner: { $exists: true } }
        ]
      }, {
        $and: [
          { invited: this.userId },
          { invited: { $exists: true } }
        ]
      }
    ]
  };


  if (partyId) {
    return { $and: [{ _id: partyId }, isAvailable] };
  }

  return isAvailable;
}

Meteor.publish('parties', function(options: any) {
  const selector = buildQuery.call(this, null);

  Counts.publish(this, 'numberOfParties', Parties.find(selector), { noReady: true });

  return Parties.find(selector, options);
});

Meteor.publish('party', function(partyId: string) {
  return Parties.find(buildQuery.call(this, partyId));
});
