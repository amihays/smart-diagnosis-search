class CreateDiagnosisSelections < ActiveRecord::Migration
  def change
    create_table :diagnosis_selections do |t|
      t.integer :query_id, null: false
      t.integer :diagnosis_id, null: false

      t.timestamps null: false
    end

    add_index :diagnosis_selections, :query_id
    add_index :diagnosis_selections, :diagnosis_id
  end
end
