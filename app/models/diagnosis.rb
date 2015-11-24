# == Schema Information
#
# Table name: diagnoses
#
#  id         :integer          not null, primary key
#  name       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Diagnosis < ActiveRecord::Base
  validates :name, presence: true

  has_many :diagnosis_selections
  has_many :queries, through: :diagnosis_selections, source: :query

  def self.most_selected(query)
    Diagnosis.joins(diagnosis_selections: :query)
             .where("queries.text LIKE ?", query.strip + "%")
             .group("diagnoses.id")
             .order("count(*) desc")
             .limit(5)
  end
end
