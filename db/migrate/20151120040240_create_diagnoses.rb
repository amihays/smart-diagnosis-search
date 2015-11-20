class CreateDiagnoses < ActiveRecord::Migration
  def change
    create_table :diagnoses do |t|
      t.string :name, null: false

      t.timestamps null: false
    end
  end
end
