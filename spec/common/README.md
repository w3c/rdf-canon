# Common files for RDF Dataset Canonicalization

This repository is meant to be used as a submodule in multiple repositories holding WG specifications.

## Retrieving group participants

The `participants.js` Node script can be used to retrieve the list of working group participants. It requires an API Key.

    node participants.js <apikey> wg/rch > participants.html
