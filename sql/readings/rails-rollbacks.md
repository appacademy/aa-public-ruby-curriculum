# Rolling Back Migrations

This reading begins with a strong warning:

**App Academy strongly discourage students from ever rolling back a migration.
This is because rolling back is not an option when working on something in
production.**

That being said, this reading exists to teach you about what rolling back is and
how it can be used. Occasionally you will make a mistake when writing a
migration. If you have already run the migration, then you cannot just edit the
migration and run it again. Rails will think it has already run the
migration--the timestamp is already in `schema_migrations`--and so nothing will
happen in response to `rails db:migrate`.

You must first _roll back_ the migration, which reverses the change (by
calling the `down`), if that is possible. This will undo the changes
and remove the timestamp from `schema_migrations`.

It is a common mistake to begin editing the migration before rolling it back.
Then, when you try to roll back, Active Record tries to roll back the migration
**as it is currently written**. This causes problems because the edited
migration does not correspond to the actual migration that was previously run.
You need to be careful of this: wait until after the rollback to edit.

To roll back the most recent migration, run `rails db:rollback`. You may now
edit the migration file and rerun. To roll back multiple migrations at once, use
the `STEP` parameter. For example, `rails db:rollback STEP=4` will roll back the
last 4 migrations.
