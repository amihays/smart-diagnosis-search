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
    Diagnosis.joins(diagnosis_selections: :query)
             .where("queries.text LIKE ?", partial_query + "%")
             .group("diagnoses.id")
             .order("count(*) desc")
             .limit(5)
  end
end
#
# SELECT
#   diagnoses.*
# FROM
#   diagnoses
# JOIN
#   diagnosis_selections ON diagnoses.id = diagnosis_selections.diagnosis_id
# JOIN
#   queries ON queries.id = diagnosis_selections.query_id
# WHERE
#   queries.text LIKE string%
# GROUP BY
#   diagnoses.id
# ORDER BY
#   count(*) DESC
# LIMIT
#   5
