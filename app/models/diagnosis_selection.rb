# == Schema Information
#
# Table name: diagnosis_selections
#
#  id           :integer          not null, primary key
#  query_id     :integer          not null
#  diagnosis_id :integer          not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

class DiagnosisSelection < ActiveRecord::Base
  validates :diagnosis_id, :query_id, presence: true

  belongs_to :query
  belongs_to :diagnosis
end
