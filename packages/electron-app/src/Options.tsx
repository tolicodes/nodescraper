import React, { useEffect, useState } from "react";

const saveGroupsToScrape = window
  .require("electron")
  .remote.require("./saveGroupsToScrape").default; // bar

const DATA_ROOT = "/data";

const fetchGroups = async () =>
  await (await fetch(`${DATA_ROOT}/groups.json`)).json();

const fetchGroupsToScrape = async () =>
  await (await fetch(`${DATA_ROOT}/groupsToScrape.json`)).json();

const onEventCheckboxChange = async (
  { target }: React.ChangeEvent<HTMLInputElement>,
  groupsToScrape: GroupsToScrape,
  setGroupsToScrape: (groups: GroupsToScrape) => void
) => {
  const index = groupsToScrape.indexOf(target.value);
  if (index === -1) {
    groupsToScrape.push(target.value);
  } else {
    groupsToScrape.splice(index, 1);
  }

  setGroupsToScrape([...groupsToScrape]);
  await saveGroupsToScrape(groupsToScrape);
};

type Event = {
  name: string;
  url: string;
};

type GroupsToScrape = string[];

type Groups = Event[];

export default () => {
  const [groups, setGroups] = useState<Groups>([]);
  const [groupsToScrape, setGroupsToScrape] = useState<GroupsToScrape>([]);

  useEffect(() => {
    (async () => {
      setGroups(await fetchGroups());
      setGroupsToScrape(await fetchGroupsToScrape());
    })();
  }, []);

  return (
    <div>
      Select up to 10 groups that you'd like to scrape for events
      {groups.map((event) => {
        console.log(groupsToScrape.includes(event.url));
        return (
          <div key={event.url}>
            <input
              type="checkbox"
              value={event.url}
              checked={groupsToScrape.includes(event.url)}
              onChange={(event) =>
                onEventCheckboxChange(event, groupsToScrape, setGroupsToScrape)
              }
            />
            {event.name}
          </div>
        );
      })}
    </div>
  );
};
