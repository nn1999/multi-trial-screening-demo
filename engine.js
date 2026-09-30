window.Screening={listFor:t=>StudyData.criteria.filter(c=>c.scope===t||(t.startsWith('eci')&&c.scope==='eci')),type:c=>/^x\d/.test(c.id)?'exclusion':'inclusion'};
