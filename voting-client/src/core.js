import uuid from 'node-uuid';

export function getUuid() {
  let id = localStorage.getItem('cli-uuid');
  if (!id) {
    id = uuid.v4();
    localStorage.setItem('cli-uuid', id);
  }
  return id;
}