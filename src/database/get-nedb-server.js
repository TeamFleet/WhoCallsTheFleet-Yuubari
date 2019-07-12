export default dbname =>
    require(`whocallsthefleet-database/db/${dbname}.nedb`).default;
