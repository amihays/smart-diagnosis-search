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

  def self.most_selected(partial_query)
    Diagnosis.includes(diagnosis_selections: :query)
             .joins(diagnosis_selections: :query)
             .where("queries.text LIKE ?", partial_query + "%")
             .group("diagnoses.id")
             .order("count(*)")
             .limit(5)
  end
end
