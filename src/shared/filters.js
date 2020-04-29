const addChores = (uid, data) => {
    return Object.entries(data.chores)
        .filter(([cid, chore]) => chore.uid === uid)
        .map(([cid, {gid, uid, name, dueDate, dateCompleted, recursion, status}]) => {
            return {cid, gid, uid, name, dueDate: new Date(dueDate), dateCompleted, recursion, status, isDone: !!dateCompleted};
        })
        .reduce((acc, chore, i) => {
            acc[chore.isDone ? 'done' : 'todo'].push(chore);
            return acc;
        }, { todo: [], done: [] });
};

const addGroups = (uid, data) => {
    const personalGroup = {
        gid: 'personal',
        name: 'personal',
        members: membersToNames(data, [uid])
    };

    return [
        personalGroup,
        ...Object.entries(data.groups)
            .filter(([gid, {members}]) => Object.values(members).includes(uid))
            .map(([gid, {name, members}]) => ({gid, name, members: membersToNames(data, Object.values(members))}))
    ];
};

const membersToNames = (data, members) => members
    .map((uid) => data.users[uid] ? data.users[uid].displayName : uid);

export {
    addChores,
    addGroups
};
