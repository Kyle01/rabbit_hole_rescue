import React from 'react';
// import { Link } from 'react-router-dom';
const treeData = [
  {
    "website": "Slack",
    "id": 12,
    "url": "https://app-academy.slack.com/messages/GCG2HBD5M/details/",
    "description": "Group3 | Slack",
    "parent": "null",
    "children": [
      {
        "website": "Slack",
        "id": 13,
        "url": "https://app-academy.slack.com/messages/GCG2HBD5M/",
        "description": "Group5 | Slack",
        "parent": 12,
        "children": [
          {
            "website": "Slack",
            "id": 14,
            "url": "https://app-academy.slack.com/messages/GCG2HBD5M/",
            "description": "Group8 | Slack",
            "parent": 13,
          },
          {
            "website": "StackOverflow",
            "id": 15,
            "url": "https://stackoverflow.com/questions/38776517/how-to-discard-local-changes-and-pull-latest-from-github-repository",
            "description": "Group5 | Slack",
            "parent": 13,
          }
        ]
      },
      {
        "website": "Slack",
        "id": 16,
        "url": "https://app-academy.slack.com/messages/GCG2HBD5M/",
        "description": "Kavian Mojabe | Slack",
        "parent": 12,
      }
    ]
  }
];
class Show extends React.Component {

  render() {
    console.log(treeData);
    const sample = (
      <h1>Index Page</h1>
    );
    return sample;
  }
}

export default Show;
