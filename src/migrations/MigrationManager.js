// @flow

type TMigrationData = {
  version: number,
  run: () => void
}

class MigrationManager {
  migrations: TMigrationData[] = []
  lastMigrationId: number

  constructor() {
    this.lastMigrationId = parseInt(localStorage.getItem('version') ?? 0)
  }

  registerMigration(data: TMigrationData) {
    if (!this.migrations.map(migration => migration.version).includes(data.version)) {
      this.migrations.push(data)
    }
  }

  migrateToLatest() {
    let lastMigrationId = this.lastMigrationId
    this.migrations
      .filter(migration => migration.version > this.lastMigrationId)
      .sort((a, b) => a.version < b.version ? -1 : 1)
      .forEach(migration => {
        console.log(`[Migration] ${lastMigrationId} -> ${migration.version}`)
        try {
          migration.run()
          lastMigrationId = migration.version
        } catch (e) {
          console.log(`----------> Error: ${e}`)
        }
      })
    localStorage.setItem('version', lastMigrationId.toString())
    this.lastMigrationId = lastMigrationId
  }
}

const instance: MigrationManager = new MigrationManager()
export default instance
